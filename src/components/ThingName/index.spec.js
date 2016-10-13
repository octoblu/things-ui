import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'

import ThingName from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingName />', () => {
  describe('when passed thing as prop', () => {
    it('should display name when thing has name property set', () => {
      const thing = { name: 'My Fancy Thing' }
      const sut = shallow(<ThingName thing={thing} />)

      expect(sut).to.contain(<div>{thing.name}</div>)
    })

    it('should display uuid when thing has no name property', () => {
      const thing = { uuid: 'My Fancy UUID' }
      const sut = shallow(<ThingName thing={thing} />)

      expect(sut).to.contain(<div>{thing.uuid}</div>)
    })
  })
})
