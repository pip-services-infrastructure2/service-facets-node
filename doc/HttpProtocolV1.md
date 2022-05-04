# HTTP REST Protocol (version 1) <br/> Faceted Search Microservice

Faceted search microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [FacetV1 class](#class1)
* [POST /facets/get_facets_by_group](#operation1)
* [POST /facets/add_facet](#operation2)
* [POST /facets/remove_facet](#operation3)
* [POST /facets/delete_facets_by_group](#operation4)
* [POST /facets/clear](#operation5)

## Data types

### <a name="class1"></a> FacetV1 class

Registers number of facet instances

**Properties:**
- group: string - group that represents particular service and search field in the service
- name: string - facet name
- count: number - number of registered instances of the facet

## Operations

### <a name="operation1"></a> Method: 'POST', route '/facets/get\_facets\_by\_group'

Retrieves facets for specified froup

**Request body:** 
- group: string - facet group name

**Response body:**
DataPage<FacetV1> object or error

### <a name="operation2"></a> Method: 'POST', route '/facets/add_facet'

Add facet by incrementing facet counter

**Request body:**
- group: string - group name
- name: string - facet name

**Response body:**
FacetV1 object or error

### <a name="operation3"></a> Method: 'POST', route '/facets/remove_facet'

Remove facet by decrementing facet counter

**Request body:**
- group: string - group name
- name: string - facet name

**Response body:**
FacetV1 object or error

### <a name="operation4"></a> Method: 'POST', route '/facets/delete\_facet\_by\_group'

Delete recorded facets for specified group

**Parameters:** 
- group: string - group name

**Response body:**
Error or null for success

### <a name="operation5"></a> Method: 'POST', route '/facets/clear'

Delete all recorded facets

**Response body:**
Error or null for success

