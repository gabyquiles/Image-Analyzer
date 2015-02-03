<?php
class PNG {
  private $filename;
  private $height;
  private $width;
  private $IHDR;
  private $PLTE;
  private $IDAT;
  private $data;
  private $depth_color;
  private $color_type; 
  private $compression_method;
  private $filter_method;
  private $interlace_method;
  private $palette;
  
  public function __construct($filename) {
    if(!file_exists($filename)) {
      throw new Exception("Invalid path");
    }
    $contents = file_get_contents($filename);
    //fixed header
    $pos = 8;
    //$color_types = array('Greyscale','unknown','Truecolour','Indexed-color','Greyscale with alpha','unknown','Truecolor with alpha');
    $len = strlen($contents);
    $safety = 1000;
    $this->data = "";
    $compressed = "";
    do {
      list($unused,$chunk_len) = unpack('N', substr($contents,$pos,4));
  
      $chunk_type = substr($contents,$pos+4,4);
  
      $chunk_data = substr($contents,$pos+8,$chunk_len);
  
      list($unused,$chunk_crc) = unpack('N', substr($contents,$pos+8+$chunk_len,4));
  //    echo "chunk length:$chunk_len(dec) 0x" . sprintf('%08x',$chunk_len) . "h<br>\n";
      //echo "chunk crc   :0x" . sprintf('%08x',$chunk_crc) . "h<br>\n";
      //echo "chunk type  :$chunk_type<br>\n";
      //echo "chunk data  $chunk_type bytes:<br>\n"  . chunk_split(bin2hex($chunk_data)) . "<br>\n";
      switch($chunk_type) {
        case 'IHDR':
          list($unused,$width,$height) = unpack('N2', substr($chunk_data,0,8));
          list($unused,$depth,$Color_type,$Compression_method,$Filter_method,$Interlace_method) = unpack('C*', substr($chunk_data,8));
          $this->width = $width;
          $this->height = $height;
          $this->depth_color = $depth;
          $this->color_type = $Color_type;
          $this->compression_method = $Compression_method;
          $this->filter_method = $Filter_method;
          $this->interlace_method = $Interlace_method;
          $bytes_per_pixel = $depth / 8;
        break;
  
        case 'PLTE':
          $palette = array();
          for($i=0;$i<$chunk_len;$i+=3) {
            $tupl = bin2hex(substr($chunk_data,$i,3));
            $this->palette = array(
              'R' => substr($tupl, 0, 2),
              'G' => substr($tupl, 2, 2),
              'B' => substr($tupl, 4, 2),
            );
          }
          break;
  
          case 'IDAT':
            $compressed .= substr($chunk_data,2,$chunk_len - 6); // 2 bytes on the front and 4 at the end
          break;
  
      }
      $pos += $chunk_len + 12;
    } while(($pos < $len) && --$safety);
    $this->data = gzinflate($compressed);
    //print hexdec(bin2hex(substr($decompressed,((int)100*($width+1)+500),1)))."<br />";
  }

  function getPixelValue($x, $y) {
    return hexdec(bin2hex(substr($this->data,((int)($this->height - $y)*($this->width+1)+$x),1)));
  }
}
