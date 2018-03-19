const highlight = str => str.replace(new RegExp(chuck.search, 'i'), `<span style="background-color: yellow">${chuck.search}</span>`)

let chuck = new Vue({
    el:'#chuck',

    data:{
        categories: ['all'],
        selected: 'all',
        fact:'',
        gDisplay: false,
        sDisplay: false,
        error: false,
        search: '',
        searched: '',
        history:[]
    },

    methods:{
        getFact: () =>{
            chuck.sDisplay = false
            chuck.error =false
            chuck.gDisplay = true
            if(chuck.selected == 'all'){
                axios.get('https://api.chucknorris.io/jokes/random')
                    .then(results =>{
                        chuck.history.push(results.request['responseURL'])
                        chuck.fact = results.data['value']
                    })
            }
            else{
                axios.get(`https://api.chucknorris.io/jokes/random?category=${chuck.selected}`)
                    .then(results =>{
                        chuck.history.push(results.request['responseURL'])
                        chuck.fact = results.data['value']
                    })
            }
        },

        getResults:() =>{
            chuck.searched = ''
            chuck.gDisplay = false
            chuck.error =false
            chuck.sDisplay = true
            axios.get(`https://api.chucknorris.io/jokes/search?query=${chuck.search}`)
                .then(results =>{
                    let obj = results.data['result']
                    for (const value of obj) {
                        chuck.searched += `<li> ${highlight(value.value)} </li>` 
                    }
                })
                .catch( err =>{
                    chuck.error =true
                    console.log(err)
                })
                
        }
    }

})

axios.get('https://api.chucknorris.io/jokes/categories')
    .then(results =>{
        for (const cat of results.data) {
            chuck.history = []
            chuck.history.push(results.request['responseURL'])
            chuck.categories.push(cat)
        }
})
