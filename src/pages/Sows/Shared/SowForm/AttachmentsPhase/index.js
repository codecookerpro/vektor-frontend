import React, { memo } from 'react';
import { useStyles } from './styles';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Paperclip, Plus } from 'react-feather';
import { useDispatch } from 'react-redux';
import { addSOWFile, removeSOWFile } from 'redux/actions/sowAction';

const AttachmentsPhase = ({ sow = {}, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterAttachment = sow.attachments.filter((file) => file.phase === title.parentPhase);

  const onChange = (e) => {
    const params = {
      _id: sow._id,
      phase: title.value,
      file: e.target.files[0],
    };
    dispatch(addSOWFile(params));
  };

  const deleteFile = (file) => {
    const params = {
      mainId: sow._id,
      _id: file._id,
    };
    dispatch(removeSOWFile(params));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {title.label}
        </Typography>
        <Grid container spacing={6}>
          {filterAttachment.map((file) => (
            <>
              <Grid item xs={6}>
                <div className={classes.fileRow}>
                  <Paperclip />
                  <span className={classes.fileName}>{file.fileName}</span>
                </div>
              </Grid>
              <Grid item xs={2} className={classes.fileName}>
                <Button className={classes.delete} size="small" onClick={() => deleteFile(file)}>
                  Remove
                </Button>
              </Grid>
            </>
          ))}
          <Grid item xs={12}>
            <Button component="label">
              <Plus /> Add another Attachment
              <input type="file" onChange={onChange} hidden />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(AttachmentsPhase);
