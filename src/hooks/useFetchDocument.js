import { useState, useEffect, use } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocument = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // del with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          let results = [];

          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          if (search) {
            results = results.filter((document) =>
              document.title.toLowerCase().includes(search.toLowerCase())
            );
          }

          if (uid) {
            results = results.filter((document) => document.uid === uid);
          }

          setDocuments(results);
          setLoading(false);
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { documents, error, loading };
};
