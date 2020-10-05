const AddTag = async (bugId, tag) => await fetch('/bugs/addTag', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: bugId,
    tag,
  }),
})
  .catch((err) => {
    console.log(`Add Tag FETCH ERROR${err}`);
  });

const AddBug = async (bug) => await fetch('/bugs/addbug', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bug
  })
})
  .catch((err) => {
    console.log(`Add Bug FETCH ERROR${err}`);
  });

const UpdateBug = async (bugId, updateObject) => {
  console.log(`The updated Bug${JSON.stringify(updateObject)}`);
  return await fetch('/bugs/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: bugId,
      updateObject,
    }),
  })
    .catch((err) => {
      console.log(`Update Bugs FETCH ERROR${err}`);
    });
};

const GetAllBugs = async () => {
  const bugs = await fetch('/bugs/getBugsJson')
    .catch((err) => {
      console.log(`GET ALL BUGS FETCH ERROR${err}`);
    });
  return await bugs.json();
};

const GetBugById = async (bugId) => {
  const result = await fetch('/bugs/getBugByIdJson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bugID: bugId,
    }),
  })
    .catch((err) => {
      console.log(`GET Bugs by Id FETCH ERROR${err}`);
    });
  return await result.json();
};

const GetAllComments = async (bugId) => result = await fetch('/comments/getall', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bugId
  })
})
  .catch((err) => {
    console.log(`GET ALL Comments FETCH ERROR${err}`);
  });

const GetUserName = async () => {
  const result = await fetch('/auth/getusername')
    .catch((err) => {
      console.log(`GET Username FETCH ERROR${err}`);
    });
  return await result.text();
};

const CreateComment = async (bugId, comment) => {
  const commentObj = { comment };
  return await fetch('/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bugId,
      comment: commentObj
    })
  })
    .catch((err) => {
      console.log(`Create Comment FETCH ERROR${err}`);
    });
};

const UpdateComment = async (bugId, commentObj) => fetch('/comments/update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bugId,
    comment: commentObj,
  }),
})
  .catch((err) => {
    console.log(`Update Comment FETCH ERROR${err}`);
  });

const DeleteComment = async (bugId, commentId) => fetch('/comments/delete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bugId,
    commentId
  })
})
  .catch((err) => {
    console.log(`Delete Comment FETCH ERROR${err}`);
  });

const GetCurrentUser = async () => {
  const result = await fetch('/auth/getUser')
    .catch((err) => {
      console.log(`GET Current USER FETCH ERROR${err}`);
    });
  return await result.json();
};
