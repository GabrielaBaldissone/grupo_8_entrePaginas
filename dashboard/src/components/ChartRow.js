import React from 'react';


function ChartRow(props){
    const { name, author, description, category, email, phone } = props;
    return (
                <tr>
                    <td>{name}</td>
                    {author && <td>{author}</td>}
                    {description && <td>{description}</td>}
                    {category && <td>{category}</td>}
                    {email && <td>{email}</td>}
                    {phone && <td>{phone}</td>}
                    
                </tr>
            )
    }
    
        

export default ChartRow;