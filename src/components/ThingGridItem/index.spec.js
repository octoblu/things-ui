import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import ThingGridItem from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingGridItem />', () => {
  describe('when passed no thing as prop', () => {
    it('should default to null', () => {
      const sut = mount(<ThingGridItem />)
      expect(sut).prop('thing').to.deep.equal(null)
    })
  })

  describe('when thing prop has no uuid', () => {
    it('should render nothing', () => {
      const sut = shallow(<ThingGridItem thing={{ something: 'nothing' }} />)
      expect(sut).to.be.blank()
    })
  })
})
