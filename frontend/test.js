const { XummSdk } = require('xumm-sdk');

async function test(){
    const xumm = new XummSdk("1da223d9-8b42-4e20-b62e-d5e624d2b521", "79e5e9dc-2672-4045-bbce-ec4c4bf35937");
    const appInfo = await xumm.ping()
    const request = {
      "TransactionType": "Payment",
      "Destination": "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
      "Amount": "10000",
      "Memos": [
        {
          "Memo": {
            "MemoData": "F09F988E20596F7520726F636B21"
          }
        }
      ]
    }

    const payload =  await xumm.payload.create(request, true)

   console.log(payload)
}

test()