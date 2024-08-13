const fs = require("node:fs");

const dataSource = {
    load(filePath){
        const jsonData = fs.readFileSync(filePath, "utf-8");
        let data;
        if(jsonData.trim() == ""){
            data = [];
        }else{
            data = JSON.parse(jsonData)
        }
        return data;
    },
    save(filePath, data){
        const newJsonData = JSON.stringify(data, null, " ");
        fs.writeFileSync(filePath, newJsonData);
    }
}

module.exports = dataSource;