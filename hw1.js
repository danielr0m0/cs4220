//aski values for cappital are 65 (A) to 90
//lower case 97 to 122
function upperCase(s){
    let str = s.split("")
      for(let char in str){
          if(str[char].charCodeAt(0) > 96 && str[char].charCodeAt(0) < 123)
             str[char] = (String.fromCharCode(str[char].charCodeAt(0)-32))
      }
   return str.join("")
}

function lowerCase(s){
    let str = s.split("")
    for (let char in str) {
        if(str[char].charCodeAt(0) > 64 && str[char].charCodeAt(0) < 91)
            str[char]= String.fromCharCode(str[char].charCodeAt(0)+32)
    }
    return str.join("")
}


//watch for periods and commas  replace the non letters use regex 
function sentenceCase(str , unconditionallyCapitalized){
    let s = str.split(" ")

    for(let word in s){
        //make sure dont get over the length of the string
        if(+word < s.length -1 && s[+word].endsWith('.'))
            s[++word] = upperCase(s[word][0]) + s[word].substr(1)
        //uppercasing the 1st word of each sentence is done now look for unconditanlly capitalized case
        for(let key in unconditionallyCapitalized){
            //replace all non a-z to ""
            if(lowerCase(unconditionallyCapitalized[key]) == (lowerCase(s[word]).replace(/[^a-z]/, "")))
                s[word]= capitalizedCase(s[word])
        }
    }
    return s.join(" ")
}

function capitalizedCase(str){  
    let s = str.split(" ")
    for(let word in s){
        let w = str.split(" ")[word]
        s[word] = upperCase(w[0]) + (w.substr(1))
    }
    return s.join(" ")
}

function alternatingCase(str){
    let w = str.split(" ")
    for(let i in w){
        //alternate each word and add to to r
        c = w[i].split("")
        for(let y in c){
            if(y%2 !=0){
                c[y]= upperCase(c[y])
            }else
                c[y]= lowerCase(c[y])
        }
        w[i] = c.join("")
    }
    return w.join(" ")
    
}

function titleCase(str, lowercaseWords){
    let s = str.split(" ")
    for(let w in s){
        if(!lowercaseWords.includes(s[w])){
            s[w]= capitalizedCase(s[w])
        }
    }
    return s.join(" ")
}

function inverseCase(str){
    let word = str.split(" ")
    for(w in word){
        word[w]= lowerCase(word[w][0])+(upperCase(word[w].substr(1)))
    }
    return word.join(" ")
}

function runStringFunctions(){
    let str = 'I watched the storm, so beautiful yet terrific. The face of the moon was in shadow.'

    let unconditionallyCapitalized = ['I', 'Moon', 'Shadow']
    let lowercaseWords = ['the', 'of', 'in', 'an']
    console.log( 'upperCase: ', upperCase(str) )
    console.log( 'lowerCase: ', lowerCase(str) )
    console.log( 'sentenceCase: ', sentenceCase(str, unconditionallyCapitalized) )
    console.log( 'capitalizedCase: ', capitalizedCase(str) )
    console.log( 'alternatingCase: ', alternatingCase(str) )
    console.log( 'titleCase: ', titleCase(str, lowercaseWords) )
    console.log( 'inverseCase: ', inverseCase(str) )
} 

runStringFunctions()

// question 2
function getCharacterFrequency(str){
    let map = {}
    for(let c in str){
        if(upperCase(str[c]) in map){
            map[upperCase(str[c])] +=1
        }else if(lowerCase(str[c]) in map){
            map[lowerCase(str[c])] +=1
        }else  
            map[str[c]] =1
    }
    return map
}

function printCharacterFrequency(map){
    for(let key in map)
        console.log(key + " occurs "+ map[key]+ " times.")
}

function runCharacterFunctions(){
    
        let str = 'Hello, World!'
        
        let frequencyObj = getCharacterFrequency(str)
        
        printCharacterFrequency(frequencyObj)
    
    }

    runCharacterFunctions()
