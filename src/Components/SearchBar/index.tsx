import { Checkbox, Grid, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



type resultProps = {
    id: any;
    name: string;
    email: string;
    role: string;
    data: any;
    count: number;
    edit:any;
    resolve: (value: unknown) => void
}



const SearchBar = (post:any) => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<resultProps[]>([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            setPosts(response.data);
            setLoading(false);
        }

        loadPosts()

    }, []);

   // editUser

   const editUser = (id: any, edit?: any) => {
    let tempUsers = posts;
    const index = tempUsers.findIndex((post: any) => post.id === id);
    tempUsers[index].edit = true;
    setPosts(tempUsers);
    setUpdate((prevState) => !prevState)

  }
//deleteuser
   const deleteUser = (id: any) => {
    let tempUsers = posts.filter((post: any) => post.id !== id);
    setPosts(tempUsers);
    setUpdate((prevState) => !prevState)
  }
  

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };


    const [checked, setChecked] = useState(false)
    const rowCheckbox = React.useRef<HTMLDivElement>(null)
    const toggleCheckboxes = () => {
        setChecked(prevState => !prevState)
    }
    
    const handleClickEditRow = (rowIndex:any) => {
        const {index} = rowIndex;
        setPosts(prev => prev.map((r:any, index:any) => ({...r, isEditing: rowIndex === index})))
    }
    return (
        <div>

            <Grid container spacing={2} item xs={12} style={{ width: "70%", margin: "auto" }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField
                        label="Search by name, email or role"
                        id="outlined-size-small"
                        defaultValue=""
                        size="small"
                        onChange={(e: any) => setSearchTitle(e.target.value)}
                    />

                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox inputProps={{ 'aria-label': 'select all desserts' }}
                                       onClick={toggleCheckboxes}
                                    />
                                </TableCell>
                                <TableCell> Name</TableCell>
                                <TableCell> Email</TableCell>
                                <TableCell> Role</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (<h4> loading ....</h4>) :
                                (posts.filter((value) => {
                                    if (searchTitle === '') {
                                        return value;
                                    }
                                    else if (value.name.toLowerCase().includes(searchTitle.toLowerCase())) {
                                        return value;
                                    }
                                    else if (value.email.toLowerCase().includes(searchTitle.toLowerCase())) {
                                        return value;
                                    }
                                    else if (value.role.toLowerCase().includes(searchTitle.toLowerCase())) {
                                        return value;
                                    }
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((value) => {
                                        return (
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox inputProps={{ 'aria-label': 'select all desserts' }}
                                                    // ref={rowCheckbox}
                                                     checked={checked}
                                                    />
                                                </TableCell>
                                                <TableCell>{value.name}</TableCell>
                                                <TableCell>{value.email}</TableCell>
                                                <TableCell>{value.role}</TableCell>
                                                <TableCell style={{ width: "60px" }}>
                                                    <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <button  
                                                         onClick={() =>editUser(value.id)}
                                                        ><span><i className="far fa-edit" style={{ width: "18px", }}></i></span> </button>
                                                       <button onClick={ () => deleteUser(value.id)}> <DeleteIcon style={{ width: "18px", color: "red" }} /></button>
                                                    </Grid>

                                                </TableCell>


                                            </TableRow>
                                        );
                                    })
                                )
                            }
                        </TableBody>
                        
                    </Table>
                </TableContainer>
                
                <Stack>
                    <Pagination count={Math.ceil((posts.length) / 10)} page={page} onChange={handleChange} />
                </Stack>
                
            </Grid>
        </div>
    );
};

export default SearchBar;