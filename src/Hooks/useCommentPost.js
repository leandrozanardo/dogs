import React from 'react';
import { COMMENT_POST } from '../Api';
import { UserContext } from '../UserContext';

function normalizeComment(json, fallbackText, username) {
  if (json && (json.comment_ID != null || json.id != null)) {
    return {
      comment_ID: String(json.comment_ID ?? json.id),
      comment_author: json.comment_author || username || 'você',
      comment_content:
        json.comment_content || json.comment || fallbackText,
    };
  }
  return {
    comment_ID: `local-${Date.now()}`,
    comment_author: username || 'você',
    comment_content: fallbackText,
  };
}

function parseErrorMessage(json, status) {
  if (!json) return `Erro ao comentar (HTTP ${status}).`;
  if (typeof json === 'string') return json;
  return (
    json.message ||
    json.error ||
    json.code ||
    `Erro ao comentar (HTTP ${status}).`
  );
}

export default function useCommentPost() {
  const { data } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const postComment = React.useCallback(
    async (photoId, text) => {
      const trimmed = text.trim();
      if (!trimmed) {
        setError('Digite um comentário antes de publicar.');
        return null;
      }

      const token = window.localStorage.getItem('token');
      if (!token) {
        setError('Faça login para comentar.');
        return null;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const { url, options } = COMMENT_POST(photoId, { comment: trimmed }, token);
        const response = await fetch(url, options);
        let json = null;

        const raw = await response.text();
        if (raw) {
          try {
            json = JSON.parse(raw);
          } catch {
            json = { message: raw };
          }
        }

        if (!response.ok) {
          throw new Error(parseErrorMessage(json, response.status));
        }

        if (json?.code && json?.message) {
          throw new Error(json.message);
        }

        setSuccess(true);
        return normalizeComment(json, trimmed, data?.username);
      } catch (err) {
        const message =
          err.message === 'Failed to fetch'
            ? 'Sem conexão com a API. Tente novamente.'
            : err.message || 'Erro ao comentar.';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [data?.username],
  );

  const clearFeedback = React.useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { postComment, loading, error, success, clearFeedback };
}
