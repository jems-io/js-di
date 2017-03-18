export interface IkernerlBinding {
    
    To(type:any):void;

    ToSingelton(type:any):void;

    ToContainerizedSingelton(type:any):void;

    ToConstant(onject:any):void;

    ToBuilderFunction(builder:any):void

    ToContainerizedBuilderFunction(builder:any):void
}