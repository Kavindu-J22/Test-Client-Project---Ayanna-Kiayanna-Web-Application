import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Header from "../../components/Header/Header";
import './notes.css';


function MyNotes({ search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  // const [notes, setNotes] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { success: successCreate } = noteCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure want to delete this Article?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);

  const history = useHistory();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successUpdate, successDelete]); //sucessCreate should include in the array

  return (
    <div>
      <Header />
      <div className="mynotes">
        <MainScreen title={`Welcome Back ${userInfo.name}..!`}>
          <br />
          {/* <img className="bg-img" src={BG} alt="bg img" /> */}
          <Link to="createnote">
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size="medium">
              Create New Article
            </Button>
          </Link>

          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {loadingDelete && <Loading />}
          {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
          {loading && <Loading />}

          {notes
            ?.reverse()
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <Accordion key={note._id}>
                
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Header
                        as={Card.Text}
                        varient="link"
                        eventkey="0"
                      >
                        <div style={{ borderBlockStyle: "none" }}>
                          {" "}
                          {note.title}
                        </div>
                      </Accordion.Header>
                    </span>

                    <div className="notesEdit">
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge style={{ backgroundColor: "green" }}>
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion>
            ))}
        </MainScreen>
      </div>
    </div>
  );
}

export default MyNotes;
