import React from "react";


function Project(){
    return(
     

       
        <div className="container ">
        <div className="head">
            <p style={{fontSize:'1.8em'}}>Self-clean water filter</p>
            <p>#Self-initiated-project</p>

        </div>
        <div className="mr-auto">
            <p style={{textAlign:'right', fontSize:'1.5em'}} className="my-4 theme">Edit Project</p>

        </div>
        <img src={"/2.PNG"} style={{textAlign: 'center', margin:'5px auto'}}  width="80%" alt=""/>
        <div className="descrip mx-auto">
            <p style={{fontSize:'1.6em'}}>Description</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eos atque nisi odit rem impedit quasi
                ducimus ab ratione ipsam tenetur quaerat, deserunt minus non delectus excepturi cupiditate animi
                repudiandae inventore doloribus! Ad quasi numquam voluptates modi, quia similique, quas tempore quam
                eveniet velit et? Repellat placeat unde esse, ratione asperiores eligendi vel soluta aliquid odio magnam
                fuga quia distinctio consequuntur dolorum! Commodi incidunt vero itaque aut quaerat. Voluptate autem
                recusandae hic sed id officia odio ad error maiores perferendis, facilis pariatur ipsam temporibus
                asperiores aperiam iste repellat! Explicabo dolores harum quod, fugit excepturi aliquid nulla? Dolorem
                reprehenderit eligendi atque perspiciatis totam possimus velit necessitatibus placeat voluptate
                explicabo molestiae illo voluptatibus ullam fugit tempore inventore voluptates officiis beatae
                architecto, eos sunt consequatur. Facere optio velit, molestias quod sed iure. Ipsum debitis
                perspiciatis quis repellendus? Quae commodi nam corporis itaque nisi quia architecto magni, nostrum
                quisquam non eius culpa assumenda consequuntur, voluptate excepturi? Recusandae aut, magni ratione
                dolore odio, molestias, architecto officiis placeat autem minus earum alias explicabo! Quia atque
                doloremque deserunt accusamus ratione ullam assumenda ut, dolor praesentium necessitatibus optio impedit
                officia ducimus labore rem at aperiam fugiat ipsum, id voluptatum? Porro sapiente, nostrum distinctio
                natus fugiat suscipit odit esse.</p>
        </div>
        <div style={{width:"90%"}} className="mx-auto">
            <p style={{color:"white", fontSize:'1.5em'}} className="mt-3 mb-3">Project Links</p>
            <p style={{color:"white"}}>https://www.amazingproject.com</p>
        </div>


        <div style={{width:"90%"}}className="mx-auto mb-5">
            <p style={{color:"white", fontSize:'1.5em'}} className="mt-3 mb-3">Comments</p>
            <img src={"/3.PNG"} width="7%" style={{display: 'inline',borderRadius: '5px',marginBottom: '10px'}}alt=""/>
            <p style={{color:"white",display: 'inline', marginLeft: '10px'}}>That's Amazing</p>
            <div className="row">
                <div className="col-md-8 ">
                    <div className="form-group">

                        <input type="text" className="form-control inputField" style={{display:'inline'}} placeholder="Skills"/>

                    </div>
                    <button className="btn   my-auto  btn-primary" style={{display:'inline'}} >Post</button>
                </div>

            </div>


        </div>
    </div>

    );

}


export default Project;