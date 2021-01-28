
const connect = require('./db_connect');
const Request = require('tedious').Request;
//const types = require('tedious').TYPES;

function execQuery(query, callback) {
    const data = [];
    
    const request = new Request(query, function (err){
        callback(data, err);
    });

    request.on('row', function (columns) {
        buildRow(columns, data);
    });

    connect.execSql(request);
}

function buildRow(columns, data) {    
    var row = {};
    columns.forEach(function (column) {
        row[column.metadata.colName] = column.value
    });
  
    data.push(row);
}

module.exports = {
    query: execQuery
}