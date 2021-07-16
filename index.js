// import {InspectorControls, ColorPalette } from wp.editor;
// import {PanelBody} from wp.components;

import {  TextControl, Flex, FlexBlock, FlexItem,IconButton, Button, Icon, PanelBody, PanelRow, ColorPicker, RadioControl} from "@wordpress/components"
import {InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
//import { useState } from '@wordpress/element';



wp.blocks.registerBlockType("ourplugin/react-block", {
    title: "React Block",
    icon: "star-empty",
    category: "common",
  attributes: {
    tileColor: {type: "string", default: "#EAEBD0"},
    heading: {type: "string", default: "Spotlight"},
    textField:{type: "string", default: ""},
    bgImage: {type:"string", default:null},
    headerImage: {type:"string", default:null},
    alignment:{type:"string", default:"left"}
    //, marginLefts:{type:"string", default:"6px"}

  },
  edit: function (props) {
    function updateHeading(event) {
      props.setAttributes({heading: event.target.value})
    }

    function updateTileColor(newColor) {
      props.setAttributes({tileColor: newColor})
    }

    function updateBgImage(Image){
        props.setAttributes({bgImage:Image.sizes.full.url})
    }
    function updateHeaderImage(Image){
        props.setAttributes({headerImage:Image.sizes.full.url})
    }
    function updateTextField(event){
        props.setAttributes({textField: event.target.value})
    }
    function updateAlignment(newValue){
        props.setAttributes({alignment: newValue})
    }

    const ALLOWED_MEDIA_TYPES = [ 'image' ];


    var align=(props.attributes.alignment=='left'?'26px':'310px'); // setting margin based on user's selection from RadioControl Component


    return ([
        <InspectorControls>
            <PanelBody title={'Tile Color Settings'}>
                <PanelRow>Select Tile Color:</PanelRow>
                <ColorPicker color={props.attributes.tileColor} onChangeComplete={ x =>props.setAttributes({tileColor : x.hex})}  />
            </PanelBody>

            <PanelBody title={'Header Image Select'}>
                <p>Select Header Image:</p>
                <MediaUploadCheck>
			<MediaUpload
				onSelect={ updateHeaderImage }
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				value={ props.attributes.bgImage }
				render={ ( { open } ) => (
					<IconButton onClick={ open } icon="upload" >Open Media Library</IconButton>
				) }
			/>
		</MediaUploadCheck>
            </PanelBody>

           


            <PanelBody title={'Background Image Select'}>
                <p>Select Background Image:</p>
                <MediaUploadCheck>
			<MediaUpload
				onSelect={ updateBgImage }
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				value={ props.attributes.bgImage }
				render={ ( { open } ) => (
					<IconButton onClick={ open } icon="upload" >Open Media Library</IconButton>
				) }
			/>
		</MediaUploadCheck>
            </PanelBody>


            <PanelBody title={'Text Field Alignment'}>

<RadioControl
label="Alignment type"
help="The type of the current user"
selected={ props.attributes.alignment }
options={ [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
] }
onChange={ ( value ) => props.setAttributes({alignment: value }) }
/>

    </PanelBody>  


        </InspectorControls>,

      <div style={{backgroundColor:props.attributes.tileColor, border:'2px solid black', height:'40rem', width:'38.1rem' }}>
               <div style={{display:'flex', height:'7rem', backgroundColor: props.attributes.tileColor, borderBottom:'2px solid black'}}>
                   <input type="text" placeholder="Heading Text" value={props.attributes.heading} onChange={updateHeading} 
                           style={{color:'white',border:'2px solid white', backgroundColor:props.attributes.tileColor, height:'3rem', width:'15rem', margin:'5px' }} />
                      <h4 style={{position:'absolute', marginLeft:'10px',marginTop:'66px' , color:'white'}}> {props.attributes.heading} </h4><div style={{position:'absolute', marginLeft:'450px',marginTop:'35px'}}><img src={props.attributes.headerImage} height='70px' width='100px' /></div></div>
                      <div style={{backgroundImage:`url(${props.attributes.bgImage})`, height:'33rem'}}>
                      <textarea type="text" value={props.attributes.textField} onChange={updateTextField} style={{ padding:'5px', paddingLeft:'8px', overflowY:'scroll', overflowX:'hidden', marginLeft: align,  marginTop:'30px', border:'0px solid black', borderRadius:'10px',background:'rgba(255,255,255,0.8)' , color:'#222', width:'17rem', height:'25rem', fontSize:'0.9rem'}} />
               </div>
      </div>
    ])
  },
  save: function (props) {

    var align=(props.attributes.alignment=='left'?'26px':'310px'); // setting margin of Text Field Area based on user's selection from RadioControl Component
    // Then Used this Margin Dynamically in Style of Text Field Area Div


    return (
        <div style={{backgroundColor:props.attributes.tileColor, border:'2px solid black', height:'40rem', width:'38.1rem' }}>
               <div style={{display:'flex', height:'7rem', backgroundColor: props.attributes.tileColor, borderBottom:'2px solid black'}}>
                   <h4 style={{position:'absolute', marginLeft:'10px',marginTop:'66px' , color:'white'}}> {props.attributes.heading} </h4><div style={{position:'absolute', marginLeft:'450px',marginTop:'35px'}}><img src={props.attributes.headerImage} height='70px' width='100px' /></div>
                </div>
                      <div style={{ display:'flex', backgroundImage:`url(${props.attributes.bgImage})`, overflow:'hidden' , height:'32.8rem'}}>
                      <div type="text"   style={{ padding:'5px', paddingLeft:'8px', overflowY:'scroll', overflowX:'hidden',  marginLeft: align , marginTop:'20px' ,border:'0px solid black', borderRadius:'10px' ,background:'rgba(255,255,255,0.8)' , color:'#222', width:'17rem', height:'25rem', fontSize:'0.9rem'}} >
                          {props.attributes.textField}
                      </div>
               </div>
      </div>
    )
  }
  })