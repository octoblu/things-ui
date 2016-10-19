import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import ThingListActions from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingListActions />', () => {
  it('should default selectedThings prop to []', () => {
    const sut = mount(<ThingListActions />)
    expect(sut).to.have.prop('selectedThings').deep.equal([])
  })

  it('should render nothing when selectedThings prop is empty', () => {
    const sut = shallow(<ThingListActions />)
    expect(sut).to.be.empty
  })
})
