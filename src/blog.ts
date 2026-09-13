import express, { type Express, type Request, type Response } from 'express';
import connection from './db/db_blog_app/index.ts';
import cors from "cors";
import * as z from "zod";

const app: Express = express();
const port = 6767;
const host = '0.0.0.0'
app.use(cors())
app.use(express.json())

// READ POST
app.get('/api/posts', async(req, res) => {
    try {
        const result = await connection.query(`
        select * from posts  
        `)
        res.status(200).json({
            message : "Success",
            data    : result[0]
        })
    } catch (error) {
        console.log(error);
        
    }
})

// ZOD VALIDATION
const postValidation = z.object({
    title       : z.string().max(100),
    content     : z.string(),
    category_id : z.number()
})
const categoryValidation = z.object({
    category_title  : z.string().max(100)
})

// CREATE POST
app.post('/api/posts', async (req, res) => {
    try {
        const {title, content, category_id} = req.body
        const isSafe = postValidation.safeParse(req.body)
        
        if (isSafe) {
            const result = await connection.query(`
                INSERT INTO posts (title, content, category_id) VALUES
                (?, ?, ?)
                `,
                [title, content, category_id]
            )
            res.status(201).json({
                message : "Successfully created new Post!",
                data    : result
            })
        }
    } catch (error) {
        
    }
})

// UPDATE POST
app.put('/api/posts/:id', async (req, res) => {
    try {
        const {title, content, category_id} = req.body
        const postId = Number(req.params.id)
        const isSafe = postValidation.safeParse(req.body)
        if (isSafe) {
            const result = await connection.query(`
                update posts
                set title = ?, content = ?, category_id = ?
                where id = ?
                `,
                [title, content, category_id, postId]
            )
            res.status(200).json({
                message : `Successfully updated id`,
                id      : postId
            })
        }
    } catch (error) {
        console.log(error);
        
    }
})

// DELETE POST
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const result = await connection.query(`            
                delete from posts
                where id = ?;
            `,
            [postId]
        )
        res.status(200).json({
            message : `Successfully deleted id`,
            id      : postId
        })
    } catch (error) {
        console.log(error);
        
    }
})


// READ CATEGORY
app.get('/api/category', async(req, res) => {
    try {
        const result = await connection.query(`
            select * from categories  
            `)
            res.status(200).json({
            message : "Success",
            data    : result[0]
        })
    } catch (error) {
        console.log(error);
        
    }
})

// POST CATEGORY
app.post('/api/category', async (req, res) => {
    try {
        const {category_title} = req.body
        const isSafe = postValidation.safeParse(req.body)
        
        if (isSafe) {
            const result = await connection.query(`
                INSERT INTO categories (category_title) VALUES
                (?)
                `,
                [category_title]
            )
            res.status(201).json({
                message : "Successfully created new Category!",
                data    : result
            })
        }
    } catch (error) {
        
    }
})

// UPDATE CATEGORY
app.put('/api/category/:id', async (req, res) => {
    try {
        const {category_title} = req.body
        const ctgryId = Number(req.params.id)
        const isSafe = postValidation.safeParse(req.body)
        if (isSafe) {
            const result = await connection.query(`
                update categories
                set category_title = ?
                where id = ?
                `,
                [category_title, ctgryId]
            )
            res.status(200).json({
                message : `Successfully updated id`,
                id      : ctgryId
            })
        }
    } catch (error) {
        console.log(error);
        
    }
})
// DELETE CATEGORY
app.delete('/api/category/:id', async (req, res) => {
    try {
        const ctgryId = Number(req.params.id)
        const result = await connection.query(`            
                delete from categories
                where id = ?;
            `,
            [ctgryId]
        )
        res.status(200).json({
            message : `Successfully deleted id`,
            id      : ctgryId
        })
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(port, host, () => {
    console.log(`listening on port ${port} host: ${host}`);    
})

