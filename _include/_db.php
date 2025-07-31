<?
//- 파일명 : _include/_db.php
//- 파일설명 : 

?><?

$DbCon = new mysqli();

function CreateDbCon()
{
	global $DbCon;
	if ( !($DbCon = mysqli_connect("localhost", "codereach", "code123!@#")) )
	{
		echo 'Could not connect to DBMS';
		exit;
	}
	
	mysqli_query($DbCon, "set names 'utf8'");
	
	mysqli_select_db($DbCon, "vrsportsfestival");
}

function DestroyDbCon()
{
	global $DbCon;
	if ( $DbCon != null )
	{
		mysqli_close($DbCon);
		$DbCon = null;
	}
}

class Recordset
{
	public $m_Rs;
	public $m_row;
	public $m_start;
	public function __construct( $Rs )
	{
		$this->m_Rs = $Rs;
		$this->m_row = null;
		$this->m_start = TRUE;
	}
	public function __destruct()
	{
		if ( $this->m_Rs != null )
		{
//			mysqli_free_result($this->m_Rs);
			$this->m_Rs = null;
		}
	}
	
	public function NextRow()
	{
		if ( $this->m_start || $this->m_row != null )
		{
			$this->m_start = FALSE;
			return $this->m_row = mysqli_fetch_array($this->m_Rs);
		}
		return FALSE;
	}
	public function Col( $id )
	{
		if ( $this->m_start )
		{
			$this->m_start = FALSE;
			$this->m_row = mysqli_fetch_array($this->m_Rs);
		}
		if ( $this->m_row != null )
		{
			return $this->m_row[$id];
		}
		return null;
	}
	
	public function GetCount()
	{
		return mysqli_num_rows($this->m_Rs);
	}
};

function CreateRecordset()
{
	return null;
}

function DestroyRecordset( $Rs )
{
	return null;
}

function OpenRecordset( $Rs, $strSql )
{
	global $DbCon;
	$Rs = mysqli_query($DbCon, $strSql);
	if ( !$Rs )
	{
		echo "DB Error, could not query the database.<br>\n";
		echo 'QUERY: ' .$strSql.'\n';
		echo 'Error: ' . mysqli_error($DbCon);
		return false;
	}
	return new Recordset($Rs);
}


?>
