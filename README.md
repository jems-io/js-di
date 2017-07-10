
### Dependency Injection (Node.js)

[![Build Status](https://travis-ci.org/JemsFramework/di.svg?branch=release-current)](https://travis-ci.org/JemsFramework/di)


#### For **JemsFramework**
By *Francisco Mercedes <franciscomerdot@gmail.com>*

---

An implementation of IoC pattern based on dependency injection that allows you to granulate and decouple your libraries or applications. Wrote using SOLID principles and a variety OOP patterns implementations.

### **Why ?**
---

Why a new dependency injection library for node ?

Actually, I asked myself this question before start to write the code, while it is true that *CommonJS* work as *IoC*, it doesn't play well when is time to implement abstractions in our code that sometimes required for good architectures, also all the *DI* libraries that I could found out there make me depend 100% in his code and this actually the problem that we wanna solve with a *DI* library [**Dependencies**].  Ones do it through decorators, others enforced us to write metadata or extra members in our code making us fully dependent of his code. Also it violate several *SOLID* principles like Dependency Inversion and Interface Segregation.

### **How it works ?**
---

Instead of metadata obtained from extra code in our code, it will use the arguments names in the functions to instantiate the dependencies.

**Note:** It's a known issue that this aproach will not work with ofuscation or a mimification that change the name of function arguments, but this solution is for server side use only, for web you can use an ADM (Asynchronous Module Definition) as require.js.

1. Intall the package. (Is a production dependency)

    ```
    npm install '@jems/di'
    ```

2. Instantiate the kernel.

    ```javascript
    let jemsDI = require('@jems/di');
    let kernel = new jemsDI.Kernel();
    ```

3. Register your functions with the kernel fluent API. (Fluent API is optional)

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

### **Example [The Collection Company]**
---

Imagine a money collection company that have two customer, each customer sends the debtors bill information to the company through files, but each company have a different file structure and serialization, the lemma of the collection company is that they adapt to your business. Also a notification must be delivered when the output file it's done, but the custmer decide how they want to be notified. Let's put it in code with this DI library.

```javascript
let jemsDI = require('@jems/di');
let kernel = new jemsDI.Kernel();

// The collection company output builder, same for both customers
class CollectionCompanyOutputBuilder {
    doOutput(filePath) { console.log('Creating output in: ', filePath) }
}

// The customer one processor.
class CustomerCompany1Processor {

    constructor(outputBuilder, recipientRepository, notifierList) {
        // Preferable stored them as private;
        this._outputBuilder = outputBuilder;        
        this._recipientRepository = recipientRepository;
        this._notifierList = notifierList;
    }

    proccessFile(filePath) {

        console.log('Customer one way to Process the files. Current -> ', filePath);

        let outputPath = '{the path}';
        this._outputBuilder.doOutput(outputPath);

        let recepients = this._recipientRepository.getRecipientsForCustomer('Customer1');
        this._notifierList.forEach(function(notifier) {
            notifier.notify(outputPath, recepients);
        }.bind(this));
    }
}

// The customer two processor.
class CustomerCompany2Processor {

    constructor(outputBuilder, recipientRepository, notifierList) {
        // Preferable stored them as private;
        this._outputBuilder = outputBuilder;        
        this._recipientRepository = recipientRepository;
        this._notifierList = notifierList;
    }

    proccessFile(filePath) {
        
        console.log('Customer two way to process the files. Current -> ', filePath);

        let outputPath = '{the path}';
        this._outputBuilder.doOutput(outputPath);

        let recepients = this._recipientRepository.getRecipientsForCustomer('Customer2');
        this._notifierList.forEach(function(notifier) {
            notifier.notify(outputPath, recepients);
        }.bind(this));
    }
}

// The recipients repository
class RecipientRepository {
    getRecipientsForCustomer(customer) { 
        console.log('Geting the reipients for customer: ', customer);
        return ['recipient1', 'recipient2'];
    }
}

 // A mail notifier
class MailNotifier {
    notify(outputFile, recipients) { 
        console.log('Sending mail with attached file ', outputFile,' to: ', recipients);
    }
}

 // A SMS notifier
class SMSNotifier {
    notify(outputFile, recipients)  { 
        console.log('Sending sms with attached file ', outputFile,' to: ', recipients);
    }
}

//Create container for each customer.
kernel.createContainer('Customer1');
kernel.getContainer('Customer1').setSupportContainersAliases(['default']);

kernel.createContainer('Customer2');
kernel.getContainer('Customer2').setSupportContainersAliases(['default']);

//Register our funtions [Classes]

// Register the output builder.
kernel.bind('outputBuilder').to(CollectionCompanyOutputBuilder);

// Register the repository.
kernel.bind('recipientRepository').to(RecipientRepository);

// Register the notifiers.
kernel.bind('notifier').to(MailNotifier);
kernel.bind('notifier').to(SMSNotifier);
// Register mail notifier for Customer 2 (Will be explained)
kernel.bind('notifier').to(MailNotifier).inContainer('Customer2');

// Regiter the processors in each custmer container.
kernel.bind('processor').to(CustomerCompany1Processor).inContainer('Customer1');
kernel.bind('processor').to(CustomerCompany2Processor).inContainer('Customer2');

console.log()
console.log('=====================================')
console.log('Processing the customer 1');
console.log('=====================================')
console.log()

kernel.useContainer('Customer1');
let customer1Processor = kernel.resolve('processor');
customer1Processor.proccessFile('{customer one file path}');

console.log()
console.log('=====================================')
console.log('Processing the customer 2');
console.log('=====================================')
console.log()

kernel.useContainer('Customer2');
let customer2Processor = kernel.resolve('processor');
customer2Processor.proccessFile('{customer two file path}');
```

*Output*

```
=====================================
Processing the customer 1
=====================================

Customer one way to Process the files. Current ->  {customer one file path}
Creating output in:  {the path}
Geting the reipients for customer:  Customer1
Sending mail with attached file  {the path}  to:  [ 'recipient1', 'recipient2' ]
Sending sms with attached file  {the path}  to:  [ 'recipient1', 'recipient2' ]

=====================================
Processing the customer 2
=====================================

Customer two way to process the files. Current ->  {customer two file path}
Creating output in:  {the path}
Geting the reipients for customer:  Customer2
Sending mail with attached file  {the path}  to:  [ 'recipient1', 'recipient2' ]

```

Let's explain what going on here. This DI library is based on containers ... and not, those containers are not the layered files system as Docker or Titus, the concept of container is that you can setup different configurations for multiples scenarios, also the containers have the capability to support each other, if one can not resolve an alias it will use his support containers in case that it have any one.

So what we are doing is.

1. We create our kernel.

2. We create the classes that we need to cover our abstractions.

3. We create two containers in the kernel to setup diferent configurations.

4. We register those classes in the kernel, some of them in a particular container.
    
    **Note**: You can note the we register `MailNotifier` two times, one in the container in use that currently is the default and another in the customer two container, this is because we want that the customer two don't use the two notifiers registered in his support container, instead because it can resolve the alias, it will use the dependency metadata registered in the container.

    With that we cover that the customer decide how they want to be notified. 

5. We get from the kernel an completly instanced object with all his dependencies.

6. We use those instances.

7. It works :)


### **Documentation**

See the documentation in the [Jems DI - Documentation Page](http://opensource.soflutionx.com/documentation/@jems/di/last)

