# Faceted Search Microservice

This is a faceted search microservice from Pip.Services library. 
It allows to search "facets" recorded by other microservices.
For instance, statistics microservice can record groups and later use them in counters search.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-infrastructure2/client-facets-node)
* Communication Protocols
  - [HTTP Version 1](doc/Htt[ProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class FacetV1 {
    public group: string;
    public name: string;
    public count: number;
}

interface IFacetsV1 {
    getFacetsByGroup(correlationId: string, group: string): Promise<FacetV1>;

    addFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;

    removeFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;
    
    deleteFacetsByGroup(correlationId: string, group: string): Promise<void>;

    clear(correlationId: string): Promise<void>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-infrastructure2/service-facets-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "service-facets"
  description: "Facets microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-facets:persistence:file:default:1.0"
  path: "./data/facets.json"

- descriptor: "service-facets:controller:default:default:1.0"
  options:
    max_facet_count: 100

- descriptor: "service-facets:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-facets-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('client-facets-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.HttpRestClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}

```

Now the client is ready to perform operations
```javascript
// Record facets for a user
let facet = await client.addFacet(
    null,
    'statistics',
    '12234'
);
```

```javascript
// Get the list of user facets
let facets = await client.getFacetsByGroup(
    null,
    'statistics'
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

