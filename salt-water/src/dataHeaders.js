export const gridsMeta = [
  {
    id: 'Users',
    
    header: {
      index: ['id', 'name', 'age'],
      columns: {
        id: 'ID',
        name: 'Name',
        age: 'Age',
      }
    },

    data: [
      {
        id: "1",
        name: "Bob",
        age: 32,
      },
      {
        id: "2",
        name: "Bill",
        age: 25,
      }
    ]
  },

  {
    id: 'Haulers',
    
    header: {
      index: ['Id', 'Name', 'Value2', 'Status', 
              'CreatedByName', 'ModifiedByName',
              'CreatedData', 'ModifiedDate',
              'CreatedBy', 'ModifiedBy',
              'ListSequence', 'DiffType'],
      columns: {
        Id: 'ID',
        Name: 'Name',
        Value2: 'Value 2',
        Status: 'Status',
        CreatedByName: 'Created By',
        ModifiedsByName: 'Modified By',
        CreatedDate: 'Created Date',
        ModifiedDate: 'Modified Date',
        CreatedBy: 'Created By',
        ModifiedBy: 'Modified By',
        ListSequence: 'List Sequence',
        DiffType: 'Diff Type',
      },
    },
    data: [  
      {
        "Id":11650,
        "Name":"1 TERO PREMIER, LLC",
        "Value2":null,
        "Status":1,
        "CreatedByName":"jgraham",
        "ModifiedsByName":"jgraham",
        "CreatedDate":"2016-05-19T14:21:59.84",
        "ModifiedDate":"0001-01-01T00:00:00",
        "CreatedBy":6450,
        "ModifiedBy":0,
        "ListSequence":6895,
        "DiffType":"HaulerTO"
      }
    ]
  }
]
