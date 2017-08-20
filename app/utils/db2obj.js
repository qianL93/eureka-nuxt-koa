module.exports = {
    toOBJ(dbObj) {
        try {
            return JSON.parse(JSON.stringify(dbObj))
        }catch(e){
            console.error(e)
            return {}
        }
    }
}