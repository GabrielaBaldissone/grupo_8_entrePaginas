import React from 'react';
import LastBookInDb from './LastBookInDb';
import GenresInDb from './GenresInDb';
import LastUserInDb from './LastUserInDb';

function ContentRowCenter({products}){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastBookInDb />
            <LastUserInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb products={products}/>

        </div>
    )
}

export default ContentRowCenter;