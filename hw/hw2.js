class Groups{
    constructor(groups = []){
        this.groups = groups
    }

    addGroup({name , leader, members = []}){
        this.groups.push({name, leader, members})
        return this
    }

    removeGroup(groupName){
        const found = this.groups.find(group =>{
            return group.name.toLowerCase() == groupName.toLowerCase()
        })

        if(found){
           this.groups.splice(this.groups.indexOf(found),1)
        }
        return this
    }

    addMember(groupName,memberName){
        const found = this.groups.find(item =>{
            return item.name.toLowerCase() === groupName.toLowerCase()
        })

        if(found){
            found.members.push(memberName)
        }

        return this
    }

    removeMember(groupName, memberName){
        const found = this.groups.find(group =>{
            return group.name.toLowerCase() === groupName.toLowerCase()
        })

        if(found){
            const mem = found.members.find(member =>{
                return member.toLowerCase() === memberName.toLowerCase()
            })
            if(mem){
                found.members.splice(found.members.indexOf(mem),1)
            }
        }
        return this
    }

    print(){
        this.groups.forEach(group =>{
            console.log()
            console.log(group.name)
            console.log("Leader: " + group.leader)
            console.log(group.members.join(" | "))
        })
    }

}


const groups = new Groups()
        groups.addGroup({
          name: 'Justice League',
          leader: 'Wonder Woman',
          members: ['Batman', 'Superman', 'Spiderman']
        })
        groups.addGroup({
          name: 'Avengers',
          leader: 'Iron Man',
          members: ['Hulk', 'Thor', 'Captain America']
        })
        groups.print()

        console.log();
        console.log("add member:")
        groups.addMember('Justice League', 'Aqua Man')

        groups.print()
        console.log();
        console.log('remove group:')

        groups.removeGroup('Avengers')
        groups.print()
        
        console.log();
        console.log('remove member:')
        groups.removeMember('Justice League', 'spiderMan')
        groups.print()


// question 2 

console.log()
console.log("Question 2:");
function displayName(person){
    let{first, last} = person
    console.log(first, last)
}

const person = {
    first: 'Elon',
    last: 'Musk',
    twitter: '@elonmusk',
    company: 'Space X'
}

displayName(person)

console.log();
console.log("Question 3:")

function combineName(person, keys=[], dKey){
    let obj = {}
    let s = []

    for (let item of keys) {
        s.push(person[item])
        delete person[item]
    }

    // ({keys, ...rest}= person)
    // console.log(rest);
    person[dKey]= s.join(" ")

    console.log(person)
    return person
}

combineName(person, ['first', 'last'], 'name')


console.log();
console.log("Question 4")

function createObject(arr =[]){
    let count = 1
    let obj ={}

    for (let objs of arr) {
        let temp = {}
        for(let item of objs){
            temp[item.key] = item.value
        }
        obj[count] = temp
        count++
    }

    console.log(obj)
}

const people = [[{
    key: 'name',
    value: 'Elon Musk'
}, {
    key: 'twitter',
    value: '@elonmusk'
}, {
    key: 'company',
    value: 'Space X'
}],
[{
    key: 'name',
    value: 'Tim Cook'
}, {
    key: 'twitter',
    value: '@tim_cook'
}, {
    key: 'company',
    value: 'Apple'
}]]

createObject(people)
