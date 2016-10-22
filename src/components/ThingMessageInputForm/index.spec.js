import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import styles from './styles.css'
import ThingMessageInputForm from './'
import { SchemaContainer } from 'zooid-meshblu-device-editor'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<ThingMessageInputForm />', () => {
  describe('when given no messageSchema', () => {
    it('should not render anything', () => {
      const sut = shallow(<ThingMessageInputForm />)
      expect(sut).to.be.blank()
    })
  })
  describe('when given a messageSchema', () => {
    const whateverSchema = {
      postTweet: {
        type: 'object',
        title: 'Post Tweet',
        'x-group-name': 'Tweets',
        required: [
          'data',
        ],
        properties: {
          data: {
            required: [
              'status',
            ],
            type: 'object',
            properties: {
              status: {
                type: 'string',
                title: 'Status',
                description: 'Some Text',
              },
            },
          },
        },
      },
    }

    it('should render a schema container', () => {
      const sut = shallow(<ThingMessageInputForm messageSchema={whateverSchema} />)
      expect(sut.find(SchemaContainer).length).to.equal(1)
    })
  })
})
