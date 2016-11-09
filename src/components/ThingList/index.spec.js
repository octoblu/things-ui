import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinonChai from 'sinon-chai'
import { mount } from 'enzyme'

import ThingList from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingList />', () => {
  describe('when passed no things as prop', () => {
    it('should default to an empty list', () => {
      const sut = mount(<ThingList />)
      expect(sut).prop('things').to.deep.equal([])
    })
  })

  describe('when things prop is empty', () => {
    it('should show a No Things Found message', () => {
      const sut = mount(<ThingList things={[]} />)
      expect(sut).to.contain(<div>No Things Found</div>)
    })
  })
})
