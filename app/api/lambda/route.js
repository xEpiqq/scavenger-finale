import AWS from 'aws-sdk';
import { NextResponse } from 'next/server'

AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_IDD, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYY })
const lambda = new AWS.Lambda({ region: 'us-west-2' });

const function_url = "https://ygekhsxush.execute-api.us-west-2.amazonaws.com/default/gmaps-scrape-0"

export async function POST(request) {    
    const body = await request.json();
    const { searchQuery, the_list_id } = body;

    let query = (searchQuery).replace(/[^a-zA-Z0-9 ]/g, "")
    let query_array = query.split(' ')
    let query_url = "https://www.google.com/search?tbm=lcl&q="

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

    let query_ending = "#rlfi=hd:;start:0"
    query_url += query_ending
    

    fetch(function_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: query_url,
            list: the_list_id
        })
    })

    await new Promise(r => setTimeout(r, 500));
    await updateEnvironmentVariables()
    return NextResponse.json({ success: "Lambdas Launched" }, { status: 200 });
}


async function updateEnvironmentVariables() {

    const lambda_functions = ['gmaps-scrape-0']

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