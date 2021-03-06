import { Box } from '@mui/system';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Navigation from './Navigation';

export default function Workspace() {
    const { store } = useContext(GlobalStoreContext);
    

    let name = store.currentList.name
    let items = store.currentList.items;
    if (store.currentList.items !== store.currentList.savedItems) {
        name = store.currentList.savedName;
        items = store.currentList.savedItems;
    }

    let listLength = (list) => {
        let count = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
                count += 1
            }
        }
        return count
    }

    const [publishActive, setPublishActive] = useState(listLength(items) !== 5);
    const handleChange = () => {
        if (document.getElementById('item-name').value && document.getElementById('item-0').value && 
            document.getElementById('item-1').value && document.getElementById('item-2').value && 
            document.getElementById('item-3').value && document.getElementById('item-4').value) {
            setPublishActive(false);
        }
        else {
            setPublishActive(true);
        }
    }

    const handlePublish = (event) => {
        event.preventDefault();
        let data = {
            name: document.getElementById('item-name').value,
            list: [document.getElementById('item-0').value,
                    document.getElementById('item-1').value,
                    document.getElementById('item-2').value,
                    document.getElementById('item-3').value,
                    document.getElementById('item-4').value]
        }
        store.publishCurrentList(data)
    }

    const handleSave = (event) => {
        let data = {
            name: document.getElementById('item-name').value,
            list: [document.getElementById('item-0').value,
                    document.getElementById('item-1').value,
                    document.getElementById('item-2').value,
                    document.getElementById('item-3').value,
                    document.getElementById('item-4').value]
        }
        store.saveList(data)
    }

    return (
        <Box>
            <Navigation />
            <TextField 
                id="item-name" 
                label="Top 5 List Name" 
                variant="outlined" 
                defaultValue={name}
                required
                sx ={{m:3, marginLeft:10}}
                onChange={handleChange}
            />
            <Box>
                <Box sx={{width:'90%', margin: '0 auto'}} >
                    <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 1. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 0}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={items[0]}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 2. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 1}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={items[1]}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 3. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 2}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={items[2]}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 4. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 3}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={items[3]}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 5. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 4}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={items[4]}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={(event) => {handleSave(event)}}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={publishActive}
                                    onClick={(event) => {handlePublish(event)}}
                                >
                                    Publish
                                </Button>
                            </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}