import FakeTypeA from "./FakeTypeA";
import FakeTypeB from "./FakeTypeB";

export default class FakeTypeC {
    constructor(fakeTypeA:FakeTypeA, fakeTypeB:FakeTypeB) { this.fackeTypeAIntance = fakeTypeA; this.fackeTypeBIntance = fakeTypeB; }
    public fackeTypeAIntance:FakeTypeA;
    public fackeTypeBIntance:FakeTypeB;
}