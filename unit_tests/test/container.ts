import LiquidTraceContainer from '../src/models/container';
import { StartupState } from '../src/utils'
import { expect, assert } from 'chai';
import 'mocha';


describe('Basic Container', () => {
  it('returns a Basic Container from a Startup State Object containing only Identifiers', () => {
    let result = new LiquidTraceContainer(StartupState.basic)
    expect(result.identifiers())
        .to.have.all.keys('id', 'key', 'title')
    expect(result.actionGroups).to.deep.equal({});
    expect(result.collection).to.deep.equal({});
    expect(result.validation).to.deep.equal({});
    expect(result.view).to.deep.equal({});
  })
})


