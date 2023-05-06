import AWS from 'aws-sdk';
import { NextResponse } from 'next/server'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_IDD,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYY
  })

const lambda = new AWS.Lambda({ region: 'us-west-2' });
const lambda_functions = ['gmaps-scrape-1', 'gmaps-scrape-2', 'gmaps-scrape-3', 'gmaps-scrape-4', 'gmaps-scrape-5',
'gmaps-scrape-6', 'gmaps-scrape-7', 'gmaps-scrape-8', 'gmaps-scrape-9', 'gmaps-scrape-0']

export async function POST(request) {    
    const body = await request.json();
    const { searchQuery, the_list_id } = body;

    let query = (searchQuery).replace(/[^a-zA-Z0-9 ]/g, "")
    let query_array = query.split(' ')
    let query_url = "https://www.google.com/search?tbm=lcl&q="

    // iterate over the array of words and add them to the query url with a + between each word
    for (let i = 0; i < query_array.length; i++) {
        switch (i) {
            case (query_array.length - 1):
                query_url += query_array[i]
                break;
            default:
                query_url += query_array[i] + '+'
                break;
        }
    }

    let query_ending = "#rlfi=hd:;start:"
    query_url += query_ending
    let query_url_array = []
    let options = ["0", "20", "40", "60", "80", "100", "120", "140", "160", "180"]
    // create 10 different query urls with different start values
    for (let i = 0; i < options.length; i++) {
        query_url_array.push(query_url + options[i])
    }
    
    // iterate over the query urls and send them to the lambda function
    for (let i = 0; i < query_url_array.length; i++) {

        let lambda_func = lambda_functions[i]
        const params = {
                FunctionName: lambda_func,
                InvocationType: 'RequestResponse',
                LogType: 'Tail',
                Payload: JSON.stringify({
                    "url_id": query_url,
                    "list_id": the_list_id
                })
            };

            lambda.invoke(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    console.log(data);
                }
            });

            console.log(`lambda ${lambda_func} invoked`)

            // update environment variables to rotate available lambda IPs
            updateEnvironmentVariables(lambda_func)
    }

    return NextResponse.json({ success: "Lambdas Launched" }, { status: 200 });
}



async function updateEnvironmentVariables(functionName) {
    const params = {
        FunctionName: functionName,
        Environment: {
            Variables: {}
        }
      }
    
      lambda.updateFunctionConfiguration(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      })
      console.log(`updated environment variables for ${functionName}`)
}