# Seneca Protocol (version 1) <br/> Faceted Search Microservice

Faceted search microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8812, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'facets',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [FacetV1 class](#class1)
* [cmd: 'get_facets_by_group'](#operation1)
* [cmd: 'add_facet'](#operation2)
* [cmd: 'remove_facet'](#operation3)
* [cmd: 'delete_facets_by_group'](#operation4)
* [cmd: 'clear'](#operation5)

## Data types

### <a name="class1"></a> FacetV1 class

Registers number of facet instances

**Properties:**
- group: string - group that represents particular service and search field in the service
- name: string - facet name
- count: number - number of registered instances of the facet

## Operations

### <a name="operation1"></a> Cmd: 'get\_facets\_by\_group'

Retrieves facets for specified froup

**Arguments:** 
- group: string - facet group name
- paging: PagingParams - paging parameters

**Returns:**
- err: Error - occured error or null for success
- page: DataPage<FacetV1> - page with retrieved facets

### <a name="operation2"></a> Cmd: 'add_facet'

Add facet by incrementing facet counter

**Arguments:** 
- group: string - group name
- name: string - facet name

**Returns:**
- err: Error - occured error or null for success
- facet: FacetV1 - object with recorded facets

### <a name="operation3"></a> Cmd: 'remove_facet'

Remove facet by decrementing facet counter

**Arguments:** 
- group: string - group name
- name: string - facet name

**Returns:**
- err: Error - occured error or null for success
- facet: FacetV1 - object with recorded facets

### <a name="operation4"></a> Cmd: 'delete\_facets\_by\_group'

Delete recorded facets for specified group

**Arguments:** 
- group: string - group name

**Returns:**
- err: Error - occured error or null for success

### <a name="operation5"></a> Cmd: 'clear'

Delete all recorded facets

**Arguments:** 
- group: string - group name

**Returns:**
- err: Error - occured error or null for success
