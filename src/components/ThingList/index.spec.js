import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import ThingList from './'
import ThingListItem from '../ThingListItem'

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
    it('should render nothing', () => {
      const sut = shallow(<ThingList things={[]} />)
      expect(sut).to.be.blank()
    })
  })

  describe('when things prop is not empty', () => {
    it('should render each thing', () => {
      const things = [
        {
          uuid: 'uuid-1',
          name: 'Thing 1',
        },
        {
          uuid: 'uuid-2',
          name: 'Thing 2',
        },
      ]
      const sut = shallow(<ThingList things={things} />)

      expect(sut).to.contain(<ThingListItem thing={things[0]} />)
      expect(sut).to.contain(<ThingListItem thing={things[1]} />)
    })
  })
})
