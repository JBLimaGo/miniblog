// filepath: d:\PROGRAMACAO\Curso_React\CursoUdemy\miniblog\src\hooks\useUpdateDocument.js
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null
};

const updateReducer = (state, action) => {
  switch(action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async(id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, docCollection, id);
      await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};

export default useUpdateDocument; // Usando export default