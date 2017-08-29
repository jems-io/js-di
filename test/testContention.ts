import * as assert from 'assert'

import * as jemsdi from "../src/index";
import { FakeTypeA } from './fake-types/fakeTypeA';
import { FakeTypeB } from './fake-types/fakeTypeB';
import { FakeTypeC } from "./fake-types/fakeTypeC";

describe('with containeraized resolution', function() {

    let kernel:jemsdi.Kernel =  jemsdi.createKernel();    
    let containerBAlias = 'containerB';
    let containerCAlias = 'containerC';

     before(function() {

        kernel.createContainer(containerBAlias).setSupportContainersAliases(['default']);
        kernel.createContainer(containerCAlias).setSupportContainersAliases([containerBAlias]);

        kernel.bind('fakeType').to(FakeTypeA);
        kernel.bind('fakeTypeA').to(FakeTypeA);

        kernel.bind('fakeType').to(FakeTypeB).inContainer(containerBAlias);
        kernel.bind('fakeTypeB').to(FakeTypeB).inContainer(containerBAlias);

        kernel.bind('fakeType').to(FakeTypeC).inContainer(containerCAlias);
        kernel.bind('fakeTypeC').to(FakeTypeC).inContainer(containerCAlias);       
     });
    
    it('should resolve an instance of FakeTypeA with fakeType alias because is registered in the container that is currently in use.', function() {
        kernel.useDefaultContainer();
        let resolvedObject:FakeTypeA =  kernel.resolve('fakeType');
        assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA');             
    });    

    it('should resolve an instance of FakeTypeA with fakeTypeA alias because is registered.', function() {
        kernel.useDefaultContainer();
        let resolvedObject:FakeTypeA =  kernel.resolve('fakeTypeA');
        assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA');             
    });

    it('should resolve an instance of FakeTypeB with fakeTypeB alias because is registered and can resolve A as a dependency of B because is supported by the default container.', function() {
        kernel.useContainer(containerBAlias);
        let resolvedObject:FakeTypeB = kernel.resolve('fakeTypeB');
        assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');          
    });

    it('should resolve an instance of FakeTypeB with fakeType alias because is registered in the container that is currently in use.', function() {
        kernel.useContainer(containerBAlias);
        let resolvedObject:FakeTypeB =  kernel.resolve('fakeType');
        assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');             
    });

    it('should resolve an instance of FakeTypeC with fakeTypeC alias because is registered and can resolve A and B as a dependency of C because is supported by the containerB that is supported by the default container.', function() {
        kernel.useContainer(containerCAlias);
        let resolvedObject:FakeTypeC = kernel.resolve('fakeTypeC');
        assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
        assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');            
    });

    it('should resolve an instance of FakeTypeC with fakeType alias because is registered in the container that is currently in use.', function() {
        kernel.useContainer(containerCAlias);
        let resolvedObject:FakeTypeC =  kernel.resolve('fakeType');
        assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');             
    });
});