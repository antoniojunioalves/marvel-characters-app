import React, { useEffect } from 'react'

// redux
import { bindActionCreators } from 'redux'
// react-redux
import { connect } from 'react-redux'
// react router
import { Link } from 'react-router-dom'

import * as charactersActions from '../../actions/characters'

// Antd
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

export const Characters = ({ loading, error, characters, localCharacters, getCharacters }) => {

  // eslint-disable-next-line
  useEffect(() => { !characters.length && !loading && !error && getCharacters() }, [characters])

  characters.length && localCharacters.length && characters.forEach((character, i) => {
    localCharacters.forEach((localCharacter) => {
      if (character.id === localCharacter.id) {
        characters[i].name = localCharacter.name
        characters[i].description = localCharacter.description
      }
    })
  })

  return (
    <div data-testid="characters-test">
      <Row gutter={8} type="flex" justify="center">

        {characters.map((character) =>
          <Col span={4} key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <Card
                hoverable
                style={{ margin: '5px 5px' }}
                size="small"
                cover={
                  <img
                    style={{ width: '100%', height: 170 }}
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`thumbnail`}
                  />
                }
              >
                <Meta title={character.name} />
              </Card>
            </Link>
          </Col>
        )
        }
      </Row>

    </div>
  )
}

const mapStateToProps = ({ characters, localCharacters }) => ({
  error: characters.error,
  loading: characters.loading,
  characters: characters.items,
  limit: characters.limit,
  offset: characters.offset,
  localCharacters: localCharacters.characters
})

const mapDispatchToProps = (dispatch) => bindActionCreators(charactersActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
