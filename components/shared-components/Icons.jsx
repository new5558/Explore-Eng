export const PinIcon = ({ type = 0, onClick, name, picture, lat, lng }) => {
    if(type == 0) {
        return(
            <div onClick={onClick} data-latitude={lat} data-longitude={lng} data-picture={picture} data-name={name} className="w-8 h-8 rounded-full shadow-md flex items-center justify-center" style={{backgroundColor: "#FF3501", borderRadius: "50% 50% 50% 0", border:"4px solid #FF3501", transform: "rotate(-45deg)"}}>
                <svg data-latitude={lat} data-longitude={lng} data-picture={picture} data-name={name} style={{fill: "#FFFFFF", transform: "rotate(45deg)"}} className="w-5 h-5" viewBox="-90 0 479 479.89074" xmlns="http://www.w3.org/2000/svg"><path data-latitude={lat} data-longitude={lng} data-picture={picture} data-name={name} d="m89.640625 27.867188-4.546875 20.757812 13.675781 3 4.546875-20.757812c2.53125-11.578126 13.972656-18.914063 25.550782-16.375l82.289062 18.019531c11.578125 2.535156 18.90625 13.976562 16.371094 25.550781l-4.546875 20.757812 13.675781 3 4.546875-20.757812c4.1875-19.128906-7.921875-38.03125-27.054687-42.222656l-82.289063-18.019532c-19.128906-4.1875-38.03125 7.921876-42.222656 27.050782zm0 0"/><path data-latitude={lat} data-longitude={lng} data-picture={picture} data-name={name} d="m299.101562 125.011719c2.535157-11.578125-4.792968-23.015625-16.371093-25.550781l-246.863281-54.0625c-11.578126-2.535157-23.019532 4.796874-25.554688 16.375l-9.867188 45.054687 288.789063 63.238281zm0 0"/><path data-latitude={lat} data-longitude={lng} data-picture={picture} data-name={name} d="m39.226562 479.890625h179.480469c17.644531 0 30.320313-14.808594 30.320313-34.074219v-243.925781h-241v243.925781c0 19.265625 13.558594 34.074219 31.199218 34.074219zm138.800782-241.632813c0-3.867187 3.132812-7 7-7 3.863281 0 7 3.132813 7 7v188.777344c0 3.867188-3.136719 7-7 7-3.867188 0-7-3.132812-7-7zm-56 0c0-3.867187 3.132812-7 7-7 3.863281 0 7 3.132813 7 7v188.777344c0 3.867188-3.136719 7-7 7-3.867188 0-7-3.132812-7-7zm-57 0c0-3.867187 3.132812-7 7-7 3.863281 0 7 3.132813 7 7v188.777344c0 3.867188-3.136719 7-7 7-3.867188 0-7-3.132812-7-7zm0 0"/>
                </svg>
            </div>
        )
    }
    const color = {
        1: ['#636160', '#D8D7DA', '#000000', '#FFFFFF'],
        // ['#CD2A00', '#D8D7DA', '#FF3501', '#FFFFFF'],
    }
    return (
<svg 
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    x="0px" 
    y="0px"
    viewBox="0 0 486.3 486.3" 
    style={{enableBackground: "new 0 0 486.3 486.3"}} 
    xmlSpace="preserve">
<g>
	<path style={{fill: color[type][0]}} d="M243.15,0v104.4c44.11,0,80,35.88,80,80c0,44.11-35.89,80-80,80v221.9l146.43-184.1
		c26.29-33.25,40.19-73.21,40.19-115.58C429.77,83.72,346.05,0,243.15,0z"/>
	<path style={{fill: color[type][1]}} d="M323.15,184.4c0-44.12-35.89-80-80-80v160C287.26,264.4,323.15,228.51,323.15,184.4z"/>
	<path style={{fill: color[type][2]}} d="M163.15,184.4c0-44.12,35.89-80,80-80V0C140.25,0,56.53,83.72,56.53,186.62
		c0,42.37,13.9,82.33,40.23,115.62L243.15,486.3V264.4C199.04,264.4,163.15,228.51,163.15,184.4z"/>
	<path style={{fill: color[type][3]}} d="M163.15,184.4c0,44.11,35.89,80,80,80v-160C199.04,104.4,163.15,140.28,163.15,184.4z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
)
}

export const SearchIcon = ({onClick}) => (
    <svg onClick={onClick} className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"/>
    </svg>
);

export const LocationIcon = ({ fill }) => (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 176c-44.004 0-80.001 36-80.001 80 0 44.004 35.997 80 80.001 80 44.005 0 79.999-35.996 79.999-80 0-44-35.994-80-79.999-80zm190.938 58.667c-9.605-88.531-81.074-160-169.605-169.599V32h-42.666v33.067c-88.531 9.599-160 81.068-169.604 169.599H32v42.667h33.062c9.604 88.531 81.072 160 169.604 169.604V480h42.666v-33.062c88.531-9.604 160-81.073 169.605-169.604H480v-42.667h-33.062zM256 405.333c-82.137 0-149.334-67.198-149.334-149.333 0-82.136 67.197-149.333 149.334-149.333 82.135 0 149.332 67.198 149.332 149.333S338.135 405.333 256 405.333z"/>
    </svg>
);

export const CloseIcon = ({ isSearching = true, onClick, fill, className }) => (
    <svg onClick={onClick} fill={fill} className={(isSearching ? " " : "hidden ") + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"/>
    </svg>
);

export const MapIcon = ({fill}) => (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.333 64c-2.176 0-4.396 1.369-9.176 3.207L320 108.802 192 64 71.469 104.531C67.197 105.604 64 109.864 64 115.197v322.136C64 443.729 68.271 448 74.666 448c1.828 0 6.505-2.33 9.087-3.319L192 403.197 320 448l120.531-40.531c4.271-1.073 7.469-5.334 7.469-10.667V74.666C448 68.271 443.729 64 437.333 64zM320 405.333l-128-44.802V106.666l128 44.803v253.864z"/>
    </svg>
);

export const PersonIcon = ({fill}) => (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"/>
    </svg>
);

export const CameraIcon = ({fill}) => (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="275" r="57.5"/><path d="M417.5 160H363c-4.6 0-8.9-2-12-5.4-28.4-31.8-39.1-42.6-50.7-42.6h-85.5c-11.7 0-23.2 10.8-51.7 42.7-3 3.4-7.4 5.3-11.9 5.3h-4.1v-8c0-4.4-3.6-8-8-8h-26c-4.4 0-8 3.6-8 8v8h-7.5C79.9 160 64 173.2 64 190.7v176c0 17.5 15.9 33.3 33.5 33.3h320c17.6 0 30.5-15.8 30.5-33.3v-176c0-17.5-12.9-30.7-30.5-30.7zM260 360.4c-50.3 2.3-91.7-39.1-89.4-89.4 2-43.9 37.5-79.4 81.4-81.4 50.3-2.3 91.7 39.1 89.4 89.4-2 43.9-37.5 79.4-81.4 81.4zM352 218c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z"/>
    </svg>
)