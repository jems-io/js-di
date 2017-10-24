import { FakeTypeA } from './fakeTypeA'
import { FakeTypeB } from './fakeTypeB'

export class FakeTypeC {

  public fackeTypeAIntance: FakeTypeA
  public fackeTypeBIntance: FakeTypeB

  constructor (fakeTypeA: FakeTypeA, fakeTypeB: FakeTypeB) { this.fackeTypeAIntance = fakeTypeA; this.fackeTypeBIntance = fakeTypeB }
}
