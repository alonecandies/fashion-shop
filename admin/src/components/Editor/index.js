import React from 'react';
import cookies from 'js-cookie';
import imageApi from 'src/features/image/imageApi';

// TinyMCE so the global var exists
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';
// importing the plugin js.
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/preview';

const Editor = ({ content, handleChange, targetName, height }) => {
  return (
    <TinyEditor
      // apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      initialValue={content}
      init={{
        skin: false,
        content_css: false,
        height: height || 500,
        plugins: `link nonbreaking codesample lists image imagetools media table wordcount preview`,
        toolbar: `undo redo | formatselect | bold italic underline |
                alignleft aligncenter alignright alignjustify | 
                bullist numlist table | outdent indent | link image media codesample | preview`,
        mode: 'exact',
        images_upload_handler: (blobInfo, success, failure) => {
          imageApi
            .uploadImage({ file: blobInfo.blob(), token: cookies.get('token') })
            .then((result) => {
              success(result.data?.url);
            })
            .catch((error) => failure(JSON.stringify(error)));
        }
      }}
      textareaName={`description`}
      onBlur={(newContent, editor) =>
        handleChange({ target: { name: targetName, value: newContent.target.getContent() } })
      }
    />
  );
};

export default Editor;
