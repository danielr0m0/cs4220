
const http = require('http')

const sample = [
    'http://www.google.com/',
    'http://www.spotify.com/us/',
    'http://twitter.com/',
    'http://google.com/nothing'
]

const getTime = (url, callback) =>{
    let start = new Date()
    let time = -1
        http.get(url, (res)=>{
            time = new Date() - start
            const error = !time ? `error ${url}` : null
        callback(error, {url: url , time : time})
        })
}

const makePromise = (url) =>{
    return new Promise( (resolve, reject) =>{
        getTime(url , (error, result)=>{
            resolve(result)
            if(error){
                reject(error)
            }
        })
    })
}
const printTimes = sample =>{
    const urlPromises = sample.map( url =>{
        return makePromise(url).catch((err) => {
            return err
        })
    })
    
    Promise.all(urlPromises)
        .then(results =>{
            console.log(results)
        })
}


printTimes(sample)

const promise = (url)=>{
    return new Promise((resolve, reject) =>{
        http.get(url, (res)=>{
            const{statusCode} = res;
            if(statusCode > 400)
                reject({error : url})
            else
                resolve({success : url})
        })
    })
}


const allPromises = (sample) => {
   let obj = {success : [] , error : []}

    const promises = sample.map((sample) => {
        return promise(sample).catch((err) => {
            return err
        })
    })

    Promise.all(promises)
        .then((results) => {
            results.forEach((result) => {
                  if(result.success == undefined)
                        obj.error.push(result.error)
                    else
                        obj.success.push(result.success)

            })
        })
        .then( () =>{
            console.log(obj)
        })
        .catch((e)=>{
            console.log(e)
        })
}


    allPromises(sample)


