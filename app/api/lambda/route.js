import AWS from 'aws-sdk';
import { NextResponse } from 'next/server'

AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_IDD, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYY })
const lambda = new AWS.Lambda({ region: 'us-west-2' });

const function_urls = [
    'https://sr368zxsgh.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-0',
    'https://lsupgg3b3j.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-1',
    'https://elh1f5bo4l.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-2',
    'https://pg8122kmre.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-3',
    'https://mlgrtg05o2.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-4',
    'https://mctomgcuh5.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-5',
    'https://3mgj5zii0m.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-6',
    'https://f8vyvczhu7.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-7',
    'https://tf7s9vqu17.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-8',
    'https://u4d1n4mhg0.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-9'
  ];
  
  
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
    for (let i = 0; i < options.length; i++) {
        query_url_array.push(query_url + options[i])
    }
    
    // iterate over the query urls and send them to the lambda function
    for (let i = 0; i < query_url_array.length; i++) {
        console.log(query_url_array[i]);
        console.log(function_urls[i])

        fetch(function_urls[i], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: query_url_array[i],
                list: the_list_id
            })
        })

        // console.log(`Query ${query_url_array} sent to lambda ${function_urls[i]}`)
        await new Promise(r => setTimeout(r, 500));
    }

    await updateEnvironmentVariables()
    return NextResponse.json({ success: "Lambdas Launched" }, { status: 200 });
}


async function updateEnvironmentVariables() {

    const lambda_functions = ['gmaps-scrape-0', 'gmaps-scrape-1', 'gmaps-scrape-2', 'gmaps-scrape-3', 'gmaps-scrape-4', 'gmaps-scrape-5',
    'gmaps-scrape-6', 'gmaps-scrape-7', 'gmaps-scrape-8', 'gmaps-scrape-9' ]

    for (let i = 0; i < lambda_functions.length; i++) {
        let params = {
            FunctionName: lambda_functions[i],
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

        console.log(`updated environment variables for function`)
    }

}