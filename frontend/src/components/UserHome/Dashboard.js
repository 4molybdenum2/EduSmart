import {
    CssBaseline,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Fab,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import { Add } from "@material-ui/icons";
  import React, { useState, useEffect } from "react";
  
  const useStyles = makeStyles((theme) => ({
    main: { marginTop: theme.spacing(10), marginBottom: theme.spacing(8) },
    grid: { padding: theme.spacing(0, 8) },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    cardContent: { flexGrow: 1 },
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 },
  }));
  
  const Dashboard = () => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      // Get Courses using API
    }, [courses]);
  
    return (
        <>
        <main className={classes.main}>
          {courses.length > 0 && (
            <Container maxWidth="md" className={classes.grid}>
              <Grid container spacing={4}>
                {courses.map((course, id) => (
                  <Grid item key={id} xs={12} sm={6} md={4}>
                    <Card
                      className={classes.card}
                      onClick={() => console.log("test")}>
                      {/* TODO: Course-code or initials in Card Media */}
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {course.name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                          {course.professor}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
          {/** Floating Action Button - Add */}
          <Fab color="primary" aria-label="add" style={{position: 'absolute', bottom : '10%', right: '5%'}}>
            <Add />
          </Fab>
        </main>
        </>
    );
  };
  
  export default Dashboard;