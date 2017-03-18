import IModule from './IModule'
import ActivationStrategy from './ServicingStrategy'

export interface IKernel {
    
    loadModules(modules:IModule[]);

    register(alias:string, activationReference:any, activationStrategy:ServicingStrategy, isContainerized:boolean):void;
    
    unregister(alias:string):void

    bind(alias:string):IkernerlBinding;

    unbind(alias:string):void
    
    dispose();    
}