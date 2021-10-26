import React, {useEffect, useState} from 'react';
import './App.css';
import {Album, Photo} from "./types/types";
import {getAlbums, getPhotos} from './api/api';
import {Button, Card, Col, Container, Form, ListGroup, Navbar, Row} from 'react-bootstrap';

function App() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [photos, setphotos] = useState<Photo[]>([])
  const [selectedUser, setselectedUser] = useState<number>(1)
  const [selectedAlbum, setselectedAlbum] = useState<number | null>(null)

  useEffect(() => {
    async function onInit() {
      const albums: Album[] = await getAlbums();
      setAlbums(albums)

      const photos: Photo[] = await getPhotos();
      setphotos(photos)
    }

    onInit();
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">🐻 Bear Share</Navbar.Brand>
        </Container>
      </Navbar>
      {albums.length > 0 ?
        selectedAlbum === null ? <Container>
          <Row>
            <Col className="mb-3">
              Select User: <Form.Select value={`${selectedUser}`} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setselectedUser(parseFloat(event.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup as="ul">
                {albums.filter(({userId}) => userId === selectedUser).map(({userId, id, title}, index) => (
                  <ListGroup.Item data-testid={`list-item-${index}`} key={id} as="li" action onClick={() => setselectedAlbum(id)}>{`UserId: ${userId} Id: ${id} Title: ${title}`}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
          : <Container>
            <Row>
              <Col className="mb-3">
                <Button onClick={() => setselectedAlbum(null)}>⬅ Back</Button>
              </Col>
            </Row>
            <Row>
              {photos.filter(({albumId}) => albumId === selectedAlbum).map(({id, albumId, title, url, thumbnailUrl}, index) => (
                <Col data-test-id={`img-card-${index}`} key={id} xs="12" md="6" lg="3" className="mb-3" style={{height: '100%'}}>
                  {
                    <Card>
                      <Card.Img variant="top" src={thumbnailUrl} />
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Button variant="primary" href={url}>Open</Button>
                      </Card.Body>
                    </Card>
                  }
                </Col>
              ))}
            </Row>
          </Container>
        : <div>Loading...</div>
      }
    </>
  );
}

export default App;
