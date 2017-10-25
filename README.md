
<p align="center">
    <a href="https://opensource.softlutionx.com" target="_blank"><img width="200"src="https://raw.githubusercontent.com/JemsFramework/di/trunk/media/jems.png">       
    </a>
    </br> 
    <b>Dependency Injection (Node.js)</b>
    </br> 
    <small>Jems Framework</small>
</p>

[![Build Status](https://travis-ci.org/JemsFramework/di.svg?branch=trunk)](https://travis-ci.org/JemsFramework/di)
[![npm version](https://badge.fury.io/js/%40jems%2Fdi.svg)](https://badge.fury.io/js/%40jems%2Fdi)


An implementation of IoC pattern based on dependency injection that allows you to granulate and decouple your libraries or applications. Wrote using SOLID principles and a variety OOP patterns implementations.

## **Why ?**
---

Why a new dependency injection library for node ?

Actually, I asked myself this question before start to write the code, while it is true that *CommonJS* work as *IoC*, it doesn't play well when is time to implement abstractions in our code that sometimes required for good architectures, also all the *DI* libraries that I could found out there make me depend 100% in his code and this actually the problem that we wanna solve with a *DI* library [**Dependencies**].  Ones do it through decorators, others enforced us to write metadata or extra members in our code making us fully dependent of his code. Also it violate several *SOLID* principles like Dependency Inversion and Interface Segregation.

## **How it works ?**
---

Instead of metadata obtained from extra code in our code, it will use the arguments names in the functions to instantiate the dependencies.

**Note:** It's a known issue that this aproach will not work with ofuscation or a mimification that change the name of function arguments, but this solution is for server side use only, for web you can use an ADM (Asynchronous Module Definition) as require.js.

1. Intall the package. (Is a production dependency)

    ```
    npm install '@jems/di'
    ```

2. Instantiate the kernel.

    ```javascript
    import * as jemsDi from '@jems/di'
    let kernel = jemsDi.createKernel();
    ```

3. Register your dependencies with the kernel fluent API. (Fluent API is optional)

    ```javascript
    class Lamborghini {
        getName() { return 'Lamborghini'; }
    }

    kernel.bind('car').to(Lamborghini);
    ```

4. Use your registered function.

    ```javascript
    let currentCar = kernel.resolve('car');

    console.log('Car Name: ', currentCar.getName());
    ```

    *Output*
    
    ```
    Car Name:  Lamborghini
    ```

    An it's done.

## **The Basics**
---

### Kernel

The kernel, is used to register, manage and resolve dependencies, also you can use it to creates and administrate containers. ``` We will discuss container in next explanations```.

- Registering and configuring dependencies.

    - You need to bind an alias to a type or an object that will be served and delivered whenever the alias be requested in a resolution process.

    ```javascript
    kernel.bind('car').to(Lamborghini);
    ```

    - #### Servicing Strategies
    
    You can specify the servicing strategy for the bind, allowing you activate and serve the type of object in a different way depending on your needs.

    The available servicing strategies are:

    | Servicing Strategies 	| Description                                            	|
    |---------------------	|--------------------------------------------------------	|
    | Instance            	| Serve a new instance of the reference.                 	|
    | Constant            	| Serve the reference as is.                             	|
    | Builder Function     	| Serve the result of the reference function invocation. 	|
    | Custom              	| Serve what you want to serve.     :)                    	|

    Eg.

    ```javascript

    import { createKernel, ServicingStrategy, ResolutionContext } from '@jems/di';

    let kernel = createKernel();

    class CustomeServicingStrategy implements ServicingStrategy {
        serve(resolutionContext: ResolutionContext, referenceTarget: any) {
            return referenceTarget; // Just returning the type or object without activation.
        }
    }

    kernel.bind('car').to(Lamborghini).asInstance()
    kernel.bind('car').to(ferrari).asConstant()
    kernel.bind('car').to(carBuilder).asBuilderFunction()
    kernel.bind('car').to(Mercedez).as(new CustomeServicingStrategy());
    ```

    - #### Delivery Strategies
    
    You can specify the delivery strategy for the bind, allowing you deliver the type of object in a different way depending on your needs.

    The available delivery strategies are:

    | Delivery Strategies 	| Description                                            	            |
    |---------------------	|------------------------------------------------------------------     |
    | Per Call        	    | Deliver by serving a new dependency in each request resolution.       |
    | Per Resolution  	    | Deliver by serving one time per an entire request resolution.         |
    | Containerized  	    | Deliver by serving one time per container.           	                |
    | Singleton            	| Deliver by serving just one time.                         	        |
    | Custom            	| Deliver by serving how you want to deliver :)            	            |   

    Eg.

    ```javascript 

    import { createKernel, DeliveryStrategy, ResolutionContext, DependencyMetadata } from '@jems/di';

    let kernel = createKernel();

    class CustomeDeliveryStrategy implements DeliveryStrategy {
        deliver(resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata) {
            // Just serving it and returning it.
            return dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference);
        }    
    }

    kernel.bind('car').to(Lamborghini).inPerCallMode()
    kernel.bind('car').to(Ferrari).inPerResolutionMode()
    kernel.bind('car').to(Mercedez).inContainerizedMode()
    kernel.bind('car').to(Ford).inSingletonMode()
    kernel.bind('car').to(Hyundai).inMode(new CustomeDeliveryStrategy())
    ```

    - #### Validators
    
    You can specify validators in order to conditionate when the bind is valid for a resolution request.

    The available validator are:

    | Validator          	        | Description                                            	            |
    |------------------------------ |------------------------------------------------------------------     |
    | Ancestor        	            | The dependency is available if inherit from a given type.             |
    | Injected Into Alias  	        | The dependency is available if is injected into a given alias.        |
    | Injected Into Type 	        | The dependency is available if is injected into a given type.         |
    | Injected Exactly Into Alias   | The dependency is available if is exactly injected into a given alias.|
    | Injected Exactly Into Type    | The dependency is available if is exactly injected into a given type. |   
    | Custom                        | The dependency is available if pass you condition :)     	            | 

    Eg.

    ``` javascript    
    import { createKernel, ResolutionContext, DependencyMetadata } from '@jems/di';

    let kernel = createKernel();

    function customeValidator(resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata) {
        return true; 
    }

    kernel.bind('car').to(Lamborghini).whenAncestorIs(Car)
    kernel.bind('car').to(Ferrari).whenInjectedIntoAlias('factory')
    kernel.bind('car').to(Mercedez).whenInjectedIntoType(Factory)
    kernel.bind('car').to(Ford).whenInjectedExactlyIntoAlias('factoryMachine')
    kernel.bind('car').to(Hyundai).whenInjectedExactlyIntoType(FactoryMachine)
    kernel.bind('car').to(Toyota).when(customeValidator)
    ```

    - #### Combine the strategies and validators
    
    You can combine the strategies and validator based on your needs and scenarios.

    ``` javascript
    kernel.bind('car') // Bind car
          .to(Lamborghini) // To a Lamborghini class or function
          .asInstance() // Serve as an instance
          .inPerResolutionMode() // Serve and return the same instance a resolution process 
          .whenInjectedIntoAlias('alias'); // Only if is injected into de bind alias
    ```

### Containers

The container allow you to issolate data, services, configurations, etc...

Eg.

If you have a multi organizational application you can use containers to separate configurations.

``` javascript
import { createKernel, ResolutionContext, DependencyMetadata } from './di/dist';

let kernel = createKernel();
kernel.createContainer('base');
kernel.createContainer('company1', ['base']);
kernel.createContainer('company2', ['base']);

class Configuration {
    public connectionString:string
}

let company1Configuration: Configuration =  { connectionString: 'A company 1 great connection string' };
let company2Configuration: Configuration =  { connectionString: 'A company 2 great connection string' };

kernel.bind('configuration').inside('company1').to(company1Configuration).asConstant();
kernel.bind('configuration').inside('company2').to(company2Configuration).asConstant();

function onRequest(req, res) {
    let configuration: Configuration = kernel.usingContainer(req.param.company).resolve('configuration');

    console.log('Lets work with the connection string: ' + configuration.connectionString);    
}
```

This example is raw, to allow you easily understand, but you should do it better than that.

#### Support Container

 The *base* container will support the companies containers, so if the companies containers cannot resolve an alias, they will ask the base to resolve it.

 ## Contribute

 If you want to contribute to the project fork the repository and pull request your issues fixes, create issues if something does not go as expected.

 To set up the project just execute in the root path ` npm run setup ` and the try to build it by executing the command ` gulp pack-cd `

 ## Documentation

 I'm still working on the documentation, it will come soo.

 I'm working in:

 - Guides
 - Tutorials
 - API documentation