import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'
import Button from 'zooid-button'

import CreateGroupButton from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<CreateGroupButton />', () => {
  describe('when filter prop is empty', () => {
    it('should render nothing', () => {
      const sut = shallow(<CreateGroupButton filter="" />)
      expect(sut).to.be.empty
    })
  })
})
