    To run the project, type npm i && npm run start in the root directory of salt-water. The haulers table is configured to pull from localhost:5000 but you can change the baseURL for it in actions/api/fetchCollection. I have a db.json file with all of the json data Randal sent to me. Just run json-server --watch db.json --port <your-port>. 

## Each table has 3 sections:
>**grid**: Describes the table's configuration and meta data related to **how it looks**, and **its capabilities as related to kendo** (sorting, filtering, styles etc). In addition, we can configure this section to represent the tables **Constraint Validation Parameters**. Currently the only thing
implemented is columnNames.

>**collection**: Describes the tables current pool of data displayed to the user. This data will be an immutable local copy of the data and validators will typically copy from this 
pool to verify an item. 

>**validation**: Describes the current **Data Processing Pools**. Most data validation request/response values will
end up here. I anticipate this being the largest reducer for any table. It is currently set up like a collection, routing requests for single items to its validEntries hash table, and
creating new entries by id. Any errors in the request currently
set the invalidEntries with the id and the error response from
the server.

To create a new table: 
    
    1) Create the actions you want (I've left a demo instance in actions/api/fetchCollections.js that pretty much spells it out)
    2) Add your table into the state tree
    3) modify the tables root reducer below the to include a route for your new table
    4) Add a reducer for your table by just copy and pasting one of the others in reducers/api/tables/index
    5.) Ensure that your tables actions are using the common validation and collection reducer
    6.) dispatch your action to test at src/index.js

Using the axiosConfig file, demo actions and demo reducers, the view should automatcially generate for any data set given that you've configured the grid section properly.






