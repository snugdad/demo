import LiquidTraceContainer from '../src/models/container';
import { StartupState } from '../src/utils'
import { expect, assert } from 'chai';
import 'mocha';


describe('Basic Container', () => {
  let result = new LiquidTraceContainer(StartupState.basic)
  it('returns a new Container initialized from a Startup State Object containing Identifiers', () => {
    expect(result.identifiers())
        .to.have.all.keys('id', 'key', 'title')
  })
  it('has all other properties assigned to empty objects', () => {

    expect(result.actionGroups).to.deep.equal({});
    expect(result.collection).to.deep.equal({});
    expect(result.validation).to.deep.equal({});
    expect(result.view).to.deep.equal({});
  })
})


