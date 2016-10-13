import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow } from 'enzyme'
import React from 'react'
import sinonChai from 'sinon-chai'
import Heading from 'zooid-heading'

import ThingHeader from './'
import ThingName from '../ThingName'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingHeader />', () => {
  describe('when passed no thing as prop', () => {
    it('should default to null', () => {
      const sut = mount(<ThingHeader />)
      expect(sut).prop('thing').to.deep.equal(null)
    })
  })

  describe('when thing prop is empty', () => {
    it('should render nothing', () => {
      const sut = shallow(<ThingHeader thing={null} />)
      expect(sut).to.be.blank()
    })
  })

  describe('when given a valid thing', () => {
    it('should render the details of given thing', () => {
      const thing = {
        name: 'Jason Thing',
        logo: 'logo-image',
        uuid: 'my-uuid',
        type: 'Fancy Type',
      }

      const sut = shallow(<ThingHeader thing={thing} />)

      expect(sut).to.contain(
        <Heading level={3}>
          <ThingName thing={thing} />
        </Heading>
      )
      expect(sut).to.contain(<Heading level={5}>Fancy Type</Heading>)
      // expect(sut).to.contain(<img src="logo-image" alt="Jason Thing" />)
    })
  })
})
