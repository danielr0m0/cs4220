const crypto = require('crypto')

let found = false;

let count = 1
    while(!found){

        const hashes = crypto.getHashes()
        const hashingAlgorithm = 'sha256',
            hash = crypto.createHash(hashingAlgorithm)

        let message = 'Hello, World!'

        message= message + count++
        hash.update(message)
        
       let digest = hash.digest('hex')

        if(digest.substr(0,3) === '000')
            found = true

        if(found == true)
            console.log(`The '${hashingAlgorithm}' digest of '${message}' is: ${digest}`);
    }

    console.log();
const request = require('request'),
    fs = require('fs'),    
    path = require('path')

request('http://albertcervantes.com/cs4220/messages.json', (error, response, body)=>{

    body = JSON.parse(body)

   const fullPublicKeyPath = path.resolve('keys', 'public_key.pem'),
        publicKey = fs.readFileSync(fullPublicKeyPath, 'utf8')

   
    
    for (const item of body) {
      const verify = crypto.createVerify('SHA256')
        verify.update( item.message )

    const isValidSignature = verify.verify(publicKey, item.signature, 'hex')
        console.log(`${isValidSignature} - ${item.message}`);
    }
})
