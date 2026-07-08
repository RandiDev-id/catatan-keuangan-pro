let dataKeuangan = JSON.parse(localStorage.getItem('catatan')) || [];

function render() {
    let ul = document.getElementById("list-pengeluaran");
    let totalSpan = document.getElementById("total");
    ul.innerHTML = "";
    let total = 0;

    dataKeuangan.forEach((item, index) => {
        let li = document.createElement("li");
        let isPengeluaran = item.tipe === "pengeluaran";
        li.style.color = isPengeluaran ? "#dc3545" : "#28a745";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.padding = "10px 0";
        
        li.innerHTML = `
            <span><strong>${item.ket}</strong>: ${isPengeluaran ? '-' : '+'} Rp ${parseInt(item.jum).toLocaleString()}</span>
            <button onclick="hapusData(${index})" style="background:red; color:white; border:none; border-radius:4px; padding:2px 8px; cursor:pointer;">X</button>
        `;
        ul.appendChild(li);

        total += isPengeluaran ? -parseInt(item.jum) : parseInt(item.jum);
    });

    totalSpan.innerText = `Rp ${total.toLocaleString()}`;
}

function tambahData() {
    let ket = document.getElementById("keterangan").value;
    let jum = document.getElementById("jumlah").value;
    let tipe = document.getElementById("tipe").value;

    if (ket && jum) {
        dataKeuangan.push({ ket, jum, tipe });
        localStorage.setItem('catatan', JSON.stringify(dataKeuangan));
        render();
        document.getElementById("keterangan").value = "";
        document.getElementById("jumlah").value = "";
    } else {
        alert("Isi semua kolom dulu, Bro!");
    }
}

function hapusData(index) {
    dataKeuangan.splice(index, 1);
    localStorage.setItem('catatan', JSON.stringify(dataKeuangan));
    render();
}

render();
